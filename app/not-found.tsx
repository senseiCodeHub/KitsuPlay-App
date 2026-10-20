import Link from "next/link";
import { FoxMark } from "@/components/FoxMark";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="page">
      <div className="container">
        <div className="empty-state">
          <FoxMark className="empty-fox" size={76} />
          <span className="kicker">404 · Lost trail</span>
          <h1>This fox took a wrong turn.</h1>
          <p>The page you were after has wandered off. Let&apos;s get you back on the scent.</p>
          <Link className="btn btn-primary" href="/">
            Back to KitsuPlay <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
