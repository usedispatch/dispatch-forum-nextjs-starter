import { ReactNode } from "react";
import { DispatchProvider, DispatchAppProps } from "@usedispatch/forum";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
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

  function buildForumPath(collectionId: string) {
    return `${forumURL}/${collectionId}`;
  }

  function buildTopicPath(collectionId: string, topicId: number) {
    return `${forumURL}/${collectionId}${topicURL}/${topicId}`;
  }

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
