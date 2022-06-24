import { ReactNode } from "react";
import { DispatchProvider, DispatchAppProps } from "@usedispatch/forum";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

interface Props {
    baseURL: string;
    forumURL: string;
    topicURL: string;
    children?: ReactNode | ReactNode[];
}

const DispatchApp = ({ 
    baseURL,
    forumURL,
    topicURL,
    children, 
    ...props
}: Props) => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const dispatchProps : DispatchAppProps = {
        wallet: wallet,
        connection: connection,
        baseURL: baseURL,
        forumURL: forumURL,
        topicURL: topicURL,
        children: children
    }

    return (
        <DispatchProvider {...dispatchProps}>
            {children}
        </DispatchProvider>
    )
}

export default DispatchApp;