import { ForumView } from "@usedispatch/forum";
import { useRouter } from "next/router";

export default function Forum() {
  const router = useRouter();
  const { collectionId } = router.query;
  console.log(collectionId);
  return <div>{collectionId && <ForumView collectionId={collectionId} />}</div>;
}
