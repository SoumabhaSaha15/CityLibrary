import { cn } from "@/util/cn";
import { FaFileCircleXmark } from "react-icons/fa6";
export default function NoRecordFound({ className = "" }) {
  return (
    <div className={cn("card", className)}>
      <div className="card-body flex flex-col items-center justify-center py-8 px-4 text-center">
        <FaFileCircleXmark className="size-16 text-error" />
        <h3 className="card-title text-xl mt-4 text-base-content">
          No record found
        </h3>
        <p className="text-base-content/60 mt-2">
          No such record available currently that matches your query.
        </p>
      </div>
    </div>
  );
}
