/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from "frog";
import { handle } from "frog/next";
import { createWalletClient, http, createPublicClient } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import {
  getFarcasterUserNFTBalances,
  FarcasterUserNFTBalancesInput,
  FarcasterUserNFTBalancesOutput,
  TokenBlockchain,
  NFTType,
} from "@airstack/frames";
import { PinataFDK } from "pinata-fdk";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";

import abi from "./abi.json";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT || "",
  pinata_gateway: "",
});


type CheckUserNFTBalancesArgs = {
  fid: number;
  contractAddresses: string[]; // Assuming contract addresses are needed as part of the input
};

// The function to check if a user has NFT balances
async function checkUserNFTBalances({ fid, contractAddresses }: CheckUserNFTBalancesArgs) {
  const variables: FarcasterUserNFTBalancesInput = {
    fid,
    tokenType: NFTType.ERC721, // Assuming you want to check for both types
    chains: [
      TokenBlockchain.Ethereum,
      TokenBlockchain.Base,
      // Add or remove chains as necessary
    ],
    limit: 100, // Adjust the limit as needed
  };

  try {
    const {
      data,
      error,
    }: FarcasterUserNFTBalancesOutput = await getFarcasterUserNFTBalances(variables);



    // Assuming 'data' contains the list of NFT balances, and you want to check if there are any
    // Adjust the logic based on the actual structure of 'data'
    return data 
  } catch (error) {
    console.error(error);
  }
}

interface Frame {
  gateToken?: string; // Using optional property, assuming gateToken might not be present
  priceWif: number; // Adjust the type according to your actual data
  priceWifout: number; // Adjust the type according to your actual data
}



const CONTRACT = (process.env.CONTRACT_ADDRESS as `0x`) || "";

// const account = privateKeyToAccount((process.env.PRIVATE_KEY as `0x`) || "");

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.ALCHEMY_URL),
});

// const walletClient = createWalletClient({
//   account,
//   chain: baseSepolia,
//   transport: http(process.env.ALCHEMY_URL),
// });

async function checkBalance(address: any) {
  try {
    const balance = await publicClient.readContract({
      address: CONTRACT,
      abi: abi,
      functionName: "balanceOf",
      args: [address, 0],
    });
    const readableBalance = Number(balance);
    return readableBalance;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function remainingSupply() {
  try {
    const balance = await publicClient.readContract({
      address: CONTRACT,
      abi: abi,
      functionName: "totalSupply",
    });
    const readableBalance = Number(balance);
    return readableBalance;
  } catch (error) {
    console.log(error);
    return error;
  }
}

interface Frame {
  gateToken?: string; // Using optional property, assuming gateToken might not be present
  priceWif: number; // Adjust the type according to your actual data
  priceWifout: number; // Adjust the type according to your actual data
}

async function getFrame(): Promise<Frame> {
    try {
    const frameData = await publicClient.readContract({
      address: CONTRACT,
      abi: abi,
      functionName: "getFrame",
    });
    // Assuming frameData is directly usable, otherwise, you might need to map or parse it
    return frameData as Frame; // Type assertion, adjust according to actual data structure
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get frame data");
  }
}

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
});

app.use(
  "/finish",
  fdk.analyticsMiddleware({ frameId: "frame-store", customId: "purchased" })
);

app.frame("/", async (c) => {
  const balance = await remainingSupply();
  const frame = await getFrame();

  // TODO: GET BALANCE OF NFT TO CHANGE PRICE
  // const userNFTs = await checkUserNFTBalances({
  //   fid: c.frameData?.fid as number,
  //   contractAddresses: ['0xe2E73Bc9952142886424631709E382f6BC169E18'], // Replace with actual contract addresses
  // })
  let price;
  // if (userNFTs && Array.isArray(userNFTs) && frame.gateToken && userNFTs.includes(frame.gateToken)) {
  //       price = frame.priceWif;
  // } else {
  //   price = frame.priceWifout;
  // }
  // console.log(price); // Do something with the price
  // PLACEHODER FOR PRICE
  price = frame.priceWifout
  if (typeof balance === "number" && balance === 0) {
    return c.res({
      image: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ color: "blue"}}>TITLE</h1>
          <h1 style={{ color: "red"}}>DESCRIPTION </h1>
          <h1 style={{ color: "green"}}>Event is Full, Sorry!</h1>
          <img
            src="https://shuk.nyc3.cdn.digitaloceanspaces.com/0x4645F04cdB1F03088948cb54A56A22acE39882e7/14"
            alt="background"
            style={{ width: "100%" }}
            title="hello world"
          />
        </div>
      ),
      imageAspectRatio: "1:1",
      intents: [
        <Button.Link href="https://warpcast.com/scheinberg">
          Make your own frame
        </Button.Link>,
      ],
      title: "Party Fun Time - SOLD OUT",
    });
  } else {
    return c.res({
      action: "/finish",
      image: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ color: "blue"}}>TITLE</h1>
          <h1 style={{ color: "red"}}>DESCRIPTION </h1>
          <h1 style={{ color: "green"}}>DATE</h1>
          <h1 style={{ color: "purple"}}>LOCATION</h1>
          <img
            src="https://shuk.nyc3.cdn.digitaloceanspaces.com/0x4645F04cdB1F03088948cb54A56A22acE39882e7/14"
            alt="background"
            style={{ width: "100%" }}
            title="hello world"
          />
        </div>
      ),
      imageAspectRatio: "1:1",
      intents: [
        <Button.Link href="https://warpcast.com/scheinberg">Share</Button.Link>,
        <Button.Transaction target="/buy/price"> 
          Buy a Ticket
        </Button.Transaction>, // SET PRICE IN THE TARGET
      ],
      title: "Party Fun Time",
    });
  }
});

app.frame("/finish", (c) => {
  return c.res({
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ color: "blue"}}>Have Fun!</h1>
        <img
          src="https://shuk.nyc3.cdn.digitaloceanspaces.com/0x4645F04cdB1F03088948cb54A56A22acE39882e7/14"
          alt="background"
          style={{ width: "100%" }}
          title="hello world"
        />
      </div>
    ),
    imageAspectRatio: "1:1",
    intents: [
      <Button.Link href="https://warpcast.com/scheinberg">
        Make your own frame
      </Button.Link>,
    ],
    title: "Party Time",
  });
});


app.transaction("/buy/price", async (c) => {
  let price = 20

  return c.contract({
    abi: abi,
    // @ts-ignore
    chainId: "eip155:84532",
    functionName: "buy",
    args: [c.frameData?.fid],
    to: CONTRACT,
    value: parseEther(`${price}`),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
