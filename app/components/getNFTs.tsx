import {
    getFarcasterUserNFTBalances,
    FarcasterUserNFTBalancesInput,
    FarcasterUserNFTBalancesOutput,
    TokenBlockchain,
    NFTType,
    init,
  } from "@airstack/frames";
  
  init(process.env.AIRSTACK_API_KEY);

  const variables: FarcasterUserNFTBalancesInput = {
    fid: 602, // set to user's fid
    tokenType: [NFTType.ERC721],
    chains: [
      TokenBlockchain.Base,
    ],
    limit: 100,
  };
  const {
    data,
    error,
    hasNextPage,
    hasPrevPage,
    getNextPage,
    getPrevPage,
  }: FarcasterUserNFTBalancesOutput = await getFarcasterUserNFTBalances(
    variables
  );
  
  if (error) throw new Error(error);
  
  console.log(data);