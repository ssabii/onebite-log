import CreatePostButton from "@/components/post/create-post-button";
import PostFeed from "@/components/post/post-feed";
import { useSession } from "@/store/session";

export default function IndexPage() {
  const session = useSession();
  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}
