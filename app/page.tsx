// Assuming your page.tsx looks something like this
import React from 'react';
import { getFrameMetadata } from 'frog/next';
import type { Metadata } from 'next';
import EventForm from './components/EventForm'; // Adjust the path as necessary
import styles from './page.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';


export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
  );
  return {
    other: frameTags,
  };
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ConnectButton />
        <h1>Plan your next event</h1>
        {/* Use the EventForm component */}
        <EventForm />
      </div>
    </main>
  );
}
