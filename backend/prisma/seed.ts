import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding RewardCatalog...');

  const rewards = [
    {
      name: 'Shield of the Ancients',
      description: 'Runed shield of great defense',
      imageUrl: 'bafybeiem6vqvjo3iieyyv3tqkjhtykpmcz3arijarrj7sn2xpgrvtqrnnq',
      rarity: 'LEGENDARY',
      type: 'ARMOR',
    },
    {
      name: 'Sword of Valor',
      description: 'Ancient sword of heroic valor',
      imageUrl: 'bafybeiezxybs5fb4mtvdmnup6ofp3xf3rq47zu4s3zrpmrga5qsr53cmdi',
      rarity: 'LEGENDARY',
      type: 'WEAPON',
    },
    {
      name: 'War Helmet',
      description: 'Worn by elite ancient warriors',
      imageUrl: 'bafybeievntw5lhv2ujurdas443p3e3m5bd2arashd6wg5moxiom2d2ehfu',
      rarity: 'MYTHIC',
      type: 'ARMOR',
    },
    {
      name: 'Elixir of Power',
      description: 'Boosts strength for a short time',
      imageUrl: 'bafybeifa2avmpdtu3f44xtkscypj3edhclnb4ii6wulaq6ityrlav54ija',
      rarity: 'MYTHIC',
      type: 'ARMOR',
    },
    {
      name: 'Epic Gladiator Sword',
      description: 'Blade favored by champions',
      imageUrl: 'bafybeifvzqh6hwmzbpgjqm26conqcq7mdtdpwghtrizqtnoibyycdkt2pa',
      rarity: 'EPIC',
      type: 'WEAPON',
    },
    {
      name: 'Enchanted Coin Pouch',
      description: 'Magical pouch that drops coins',
      imageUrl: 'bafybeia5lyalmszsemfjzc77cbys62bqrnca4d6ymx7r6rkt6tynede2ja',
      rarity: 'EPIC',
      type: 'ACCESSORY',
    },
    {
      name: 'Golden Bow',
      description: 'Ornate bow with deadly accuracy',
      imageUrl: 'bafybeidmxdn6rkl7t4woilq7eafmjcho53sbtre5fc3zvbwolg5rukcwry',
      rarity: 'EPIC',
      type: 'WEAPON',
    },
    {
      name: 'Axe of the Forest Guardian',
      description: 'Axe powered by forest spirits',
      imageUrl: 'bafybeicp7bn43335xjiekz6net5t7d27tgtmvtdngfqo5zat3n6pyfjtsy',
      rarity: 'RARE',
      type: 'ACCESSORY',
    },
    {
      name: 'Ancient Tome',
      description: 'Grants forgotten arcane spells',
      imageUrl: 'bafybeibazw7oerfvm7r5psfzts3twxnizvnuop5rixcgltart63cv5s4ua',
      rarity: 'RARE',
      type: 'ACCESSORY',
    },
    {
      name: "Adventurer's Boots",
      description: 'Boots that boost running speed',
      imageUrl: 'bafybeieq46mwfapvj5a4u2bfyoejtcxt4byotu7dzn5ydk3vy4slu26y3q',
      rarity: 'RARE',
      type: 'ARMOR',
    },
    {
      name: 'Forest Dagger',
      description: 'Silent blade for forest scouts',
      imageUrl: 'bafybeif2wv4yk7vs6dqy4zgdtmkwv6z6yqqumkjamfduvvzuazw77fod7u',
      rarity: 'RARE',
      type: 'WEAPON',
    },
    {
      name: "Champion's Sword",
      description: 'Battle-worn sword of victors',
      imageUrl: 'bafybeiencz75zd3f32bqeahmunnt6d4tjog2dn3panlklemtgekmwwoo2u',
      rarity: 'RARE',
      type: 'WEAPON',
    },
    {
      name: 'Skeleton Key',
      description: 'Unlocks ancient hidden doors',
      imageUrl: 'bafybeie74rgbkybqsh477ewpg4zup6iv7ti2rkvolic6nawkoqcdjnbe3y',
      rarity: 'RARE',
      type: 'ACCESSORY',
    },
  ];

  // Create all rewards
  for (const reward of rewards) {
    await prisma.rewardCatalog.create({
      data: reward,
    });
  }

  console.log(`✅ Created ${rewards.length} rewards in the catalog`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
