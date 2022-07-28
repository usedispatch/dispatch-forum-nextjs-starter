import { ReactNode, useEffect, useState } from "react";
import { DispatchProvider, DispatchAppProps } from "@usedispatch/forum";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useRouter } from "next/router";
interface Props {
  baseURL: string;
  forumURL: string;
  topicURL: string;
  children?: ReactNode | ReactNode[];
  cluster?: web3.Cluster;
}

const DispatchApp = ({
  baseURL,
  forumURL,
  topicURL,
  children,
  cluster,
  ...props
}: Props) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const router = useRouter();

  function buildForumPath(collectionId: string) {
    return `${forumURL}/${collectionId}`;
  }

  function buildTopicPath(collectionId: string, topicId: number) {
    return `${forumURL}/${collectionId}${topicURL}/${topicId}`;
  }

  useEffect(() => {
    const handleRouteChange = () => {
      router.reload();
    };

    window.addEventListener("popstate", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [router]);

  const dispatchProps: DispatchAppProps = {
    wallet: wallet,
    connection: connection,
    buildForumPath: buildForumPath,
    buildTopicPath: buildTopicPath,
    children: children,
    cluster: cluster,
  };

  return <DispatchProvider {...dispatchProps}>{children}</DispatchProvider>;
};

export default DispatchApp;
