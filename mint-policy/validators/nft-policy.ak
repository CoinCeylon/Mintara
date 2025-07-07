use aiken/collection/dict.{Dict}
use aiken/collection/list
use aiken/crypto.{Blake2b_224, Hash, VerificationKeyHash}
use aiken/interval
use aiken/primitive/bytearray
use aiken/primitive/string
use cardano/assets.{AssetName, PolicyId, Value, quantity_of}
use cardano/transaction.{Input, Output, OutputReference, Transaction}

// NFT Metadata structure
pub type NFTMetadata {
  name: ByteArray,
  description: ByteArray,
  image: ByteArray,
  attributes: List<(ByteArray, ByteArray)>,
}

// Minting action types
pub type MintingAction {
  MintNFT {
    token_name: AssetName,
    metadata: NFTMetadata,
    owner: VerificationKeyHash,
  }
  BurnNFT { token_name: AssetName }
}

// Main minting validator
validator nft_policy(owner_pkh: VerificationKeyHash) {
  mint(redeemer: MintingAction, policy_id: PolicyId, self: Transaction) {
    when redeemer is {
      MintNFT { token_name, metadata, owner } ->
        // Validate minting conditions
        validate_nft_mint(
          self,
          token_name,
          metadata,
          owner,
          owner_pkh,
          policy_id,
        )
      BurnNFT { token_name } ->
        // Validate burning conditions  
        validate_nft_burn(self, token_name, owner_pkh, policy_id)
    }
  }

  else(_) {
    fail
  }
}

// Validate NFT minting
fn validate_nft_mint(
  transaction: Transaction,
  token_name: AssetName,
  metadata: NFTMetadata,
  recipient: VerificationKeyHash,
  authorized_minter: VerificationKeyHash,
  policy_id: PolicyId,
) -> Bool {
  // Validate metadata
  let metadata_valid = validate_metadata(metadata)
  // Check that the transaction is signed by the authorized minter
  let signed_by_minter =
    list.any(
      transaction.extra_signatories,
      fn(signer) { signer == authorized_minter },
    )
  // Check that exactly 1 NFT is being minted
  let mint_valid = check_single_mint(transaction.mint, policy_id, token_name)
  and {
    metadata_valid,
    signed_by_minter,
    mint_valid,
  }
}

// Validate NFT burning
fn validate_nft_burn(
  transaction: Transaction,
  token_name: AssetName,
  authorized_burner: VerificationKeyHash,
  policy_id: PolicyId,
) -> Bool {
  // Check that the transaction is signed by the authorized burner
  let signed_by_burner =
    list.any(
      transaction.extra_signatories,
      fn(signer) { signer == authorized_burner },
    )
  // Check that exactly 1 NFT is being burned (negative mint)
  let burn_valid = check_single_burn(transaction.mint, policy_id, token_name)
  and {
    signed_by_burner,
    burn_valid,
  }
}

// Check that exactly 1 token is being minted
fn check_single_mint(
  mint_value: Value,
  policy_id: PolicyId,
  token_name: AssetName,
) -> Bool {
  // Check that exactly 1 NFT is being minted
  let quantity = quantity_of(mint_value, policy_id, token_name)
  quantity == 1
}

// Check that exactly 1 token is being burned
fn check_single_burn(
  mint_value: Value,
  policy_id: PolicyId,
  token_name: AssetName,
) -> Bool {
  // Check that exactly 1 NFT is being burned (negative quantity)
  let quantity = quantity_of(mint_value, policy_id, token_name)
  quantity == -1
}

// Validate NFT metadata
fn validate_metadata(metadata: NFTMetadata) -> Bool {
  let NFTMetadata { name, description, image, attributes } = metadata
  // Basic validation rules
  let name_valid = !bytearray.is_empty(name) && bytearray.length(name) <= 50
  let description_valid = bytearray.length(description) <= 500
  let image_valid = !bytearray.is_empty(image)
  let attributes_valid = list.length(attributes) <= 20
  and {
    name_valid,
    description_valid,
    image_valid,
    attributes_valid,
  }
}

// Helper function to create test transaction
fn create_test_transaction(
  mint_value: Value,
  signatories: List<VerificationKeyHash>,
) -> Transaction {
  Transaction {
    inputs: [],
    reference_inputs: [],
    outputs: [],
    fee: 0,
    mint: mint_value,
    certificates: [],
    withdrawals: [],
    validity_range: interval.everything,
    extra_signatories: signatories,
    redeemers: [],
    datums: dict.empty,
    id: #"",
    votes: [],
    proposal_procedures: [],
    current_treasury_amount: None,
    treasury_donation: None,
  }
}

// Test examples
test mint_nft_success() {
  let owner_pkh = #"aabbccdd"
  let token_name = "MyNFT001"
  let metadata =
    NFTMetadata {
      name: "My First NFT",
      description: "This is my first NFT",
      image: "ipfs://QmHash123",
      attributes: [("rarity", "common"), ("color", "blue")],
    }
  // Create a mock policy ID
  let policy_id = #"f4c9f9c4252d86702c2f4c2e49e6648c7cffe3c8f2b6b7d779788f50"
  // Create mint value using assets.from_asset
  let mint_value = assets.from_asset(policy_id, token_name, 1)
  // Create test transaction
  let tx = create_test_transaction(mint_value, [owner_pkh])
  // Test the validation
  let result =
    validate_nft_mint(tx, token_name, metadata, owner_pkh, owner_pkh, policy_id)
  trace @"NFT minting test": result
  result
}

test burn_nft_success() {
  let owner_pkh = #"aabbccdd"
  let token_name = "MyNFT001"
  // Create a mock policy ID
  let policy_id = #"f4c9f9c4252d86702c2f4c2e49e6648c7cffe3c8f2b6b7d779788f50"
  // Create burn value (negative quantity)
  let burn_value = assets.from_asset(policy_id, token_name, -1)
  // Create test transaction
  let tx = create_test_transaction(burn_value, [owner_pkh])
  // Test the validation
  let result = validate_nft_burn(tx, token_name, owner_pkh, policy_id)
  trace @"NFT burning test": result
  result
}

test metadata_validation() {
  let valid_metadata =
    NFTMetadata {
      name: "Valid NFT",
      description: "A valid NFT description",
      image: "ipfs://QmValidHash",
      attributes: [("type", "artwork"), ("rarity", "rare")],
    }
  let invalid_metadata_empty_name =
    NFTMetadata {
      name: "",
      description: "Description",
      image: "ipfs://QmHash",
      attributes: [],
    }
  let valid_result = validate_metadata(valid_metadata)
  let invalid_result = validate_metadata(invalid_metadata_empty_name)
  trace @"Valid metadata": valid_result
  trace @"Invalid metadata": invalid_result
  valid_result && !invalid_result
}
