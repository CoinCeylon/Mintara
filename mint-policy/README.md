## High-Level Overview

This Aiken smart contract is a **minting policy** for NFTs (Non-Fungible Tokens) on Cardano.  
It allows:
- **Minting** (creating) a new NFT with metadata, only if the transaction is signed by an authorized minter.
- **Burning** (destroying) an NFT, only if the transaction is signed by the authorized burner.
- **Validates** that only one NFT is minted or burned per transaction, and that metadata is well-formed.

---

## Line-by-Line Explanation

### Imports

```aiken
use aiken/collection/dict.{Dict}
use aiken/collection/list
use aiken/crypto.{Blake2b_224, Hash, VerificationKeyHash}
use aiken/interval
use aiken/primitive/bytearray
use aiken/primitive/string
use cardano/assets.{AssetName, PolicyId, Value, quantity_of}
use cardano/transaction.{Input, Output, OutputReference, Transaction}
```
- **Imports** various modules for working with lists, dictionaries, cryptography, intervals, byte arrays, strings, Cardano assets, and transactions.

---

### Data Types

```aiken
pub type NFTMetadata {
  name: ByteArray,
  description: ByteArray,
  image: ByteArray,
  attributes: List<(ByteArray, ByteArray)>,
}
```
- **NFTMetadata**: Structure for NFT metadata (name, description, image, and custom attributes).

```aiken
pub type MintingAction {
  MintNFT {
    token_name: AssetName,
    metadata: NFTMetadata,
    owner: VerificationKeyHash,
  }
  BurnNFT { token_name: AssetName }
}
```
- **MintingAction**: Enum for two actions:
  - `MintNFT`: Mint a new NFT with a name, metadata, and owner.
  - `BurnNFT`: Burn (destroy) an NFT by name.

---

### Main Validator

```aiken
validator nft_policy(owner_pkh: VerificationKeyHash) {
  mint(redeemer: MintingAction, policy_id: PolicyId, self: Transaction) {
    when redeemer is {
      MintNFT { token_name, metadata, owner } ->
        validate_nft_mint(self, token_name, metadata, owner, owner_pkh, policy_id)
      BurnNFT { token_name } ->
        validate_nft_burn(self, token_name, owner_pkh, policy_id)
    }
  }
  else(_) {
    fail
  }
}
```
- **nft_policy**: The main minting policy.
  - Takes `owner_pkh` (the authorized minter's public key hash).
  - On mint:
    - If `MintNFT`, calls `validate_nft_mint`.
    - If `BurnNFT`, calls `validate_nft_burn`.
  - If anything else, fails.

---

### Validation Functions

#### Minting

```aiken
fn validate_nft_mint(
  transaction: Transaction,
  token_name: AssetName,
  metadata: NFTMetadata,
  recipient: VerificationKeyHash,
  authorized_minter: VerificationKeyHash,
  policy_id: PolicyId,
) -> Bool {
  let metadata_valid = validate_metadata(metadata)
  let signed_by_minter = list.any(transaction.extra_signatories, fn(signer) { signer == authorized_minter })
  let mint_valid = check_single_mint(transaction.mint, policy_id, token_name)
  and { metadata_valid, signed_by_minter, mint_valid }
}
```
- **Checks**:
  - Metadata is valid.
  - Transaction is signed by the authorized minter.
  - Exactly one NFT is minted.

#### Burning

```aiken
fn validate_nft_burn(
  transaction: Transaction,
  token_name: AssetName,
  authorized_burner: VerificationKeyHash,
  policy_id: PolicyId,
) -> Bool {
  let signed_by_burner = list.any(transaction.extra_signatories, fn(signer) { signer == authorized_burner })
  let burn_valid = check_single_burn(transaction.mint, policy_id, token_name)
  and { signed_by_burner, burn_valid }
}
```
- **Checks**:
  - Transaction is signed by the authorized burner.
  - Exactly one NFT is burned.

---

### Helper Functions

#### Mint/Burn Quantity

```aiken
fn check_single_mint(mint_value: Value, policy_id: PolicyId, token_name: AssetName) -> Bool {
  let quantity = quantity_of(mint_value, policy_id, token_name)
  quantity == 1
}
fn check_single_burn(mint_value: Value, policy_id: PolicyId, token_name: AssetName) -> Bool {
  let quantity = quantity_of(mint_value, policy_id, token_name)
  quantity == -1
}
```
- **Ensures** only one NFT is minted or burned.

#### Metadata Validation

```aiken
fn validate_metadata(metadata: NFTMetadata) -> Bool {
  let NFTMetadata { name, description, image, attributes } = metadata
  let name_valid = !bytearray.is_empty(name) && bytearray.length(name) <= 50
  let description_valid = bytearray.length(description) <= 500
  let image_valid = !bytearray.is_empty(image)
  let attributes_valid = list.length(attributes) <= 20
  and { name_valid, description_valid, image_valid, attributes_valid }
}
```
- **Checks**:
  - Name is not empty and ≤ 50 bytes.
  - Description ≤ 500 bytes.
  - Image is not empty.
  - ≤ 20 attributes.

---

### Test Transaction Helper

```aiken
fn create_test_transaction(mint_value: Value, signatories: List<VerificationKeyHash>) -> Transaction {
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
```
- **Creates a mock transaction** for testing.

---

### Tests

```aiken
test mint_nft_success() { ... }
test burn_nft_success() { ... }
test metadata_validation() { ... }
```
- **Unit tests** for minting, burning, and metadata validation.

---

## What You Need to Provide

To use this contract, you must provide:
1. **The authorized minter's public key hash** (`owner_pkh`) when deploying the policy.
2. **Correct redeemer data** when minting or burning:
   - For minting: `MintNFT` with `token_name`, `metadata`, and `owner`.
   - For burning: `BurnNFT` with `token_name`.
3. **A transaction signed by the authorized minter/burner**.
4. **Valid NFT metadata** (name, description, image, attributes) when minting.

---


