import { ForumView } from "@usedispatch/forum";
import { useRouter } from 'next/router';

export default function Forum() {
  const router = useRouter();
  const { collectionId } = router.query;
  return (
    <div>
     {collectionId && <ForumView collectionId={collectionId}/>}
    </div>
  );
}