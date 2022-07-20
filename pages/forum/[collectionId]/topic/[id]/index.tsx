import { TopicView } from "@usedispatch/forum";
import { useRouter } from 'next/router';

export default function Forum() {
  const router = useRouter();
  const { collectionId, id } = router.query;
  const topicId = parseInt(id);
  return (
    <div>
      {collectionId && id && <TopicView collectionId={collectionId} topicId={topicId}/>}
    </div>
  );
}