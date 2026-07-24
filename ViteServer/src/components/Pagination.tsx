import { useId } from "react";
import { cn } from "@/util/cn";
import RippleButton from "@/components/RippleButton";
import * as pagination from "@zag-js/pagination";
import { useMachine, normalizeProps } from "@zag-js/react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface PaginationProp {
  currentPage: number; // 1-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProp) => {
  // Zag.js natively calculates pages using 'count' (total items) and 'pageSize'
  // We can perfectly simulate 'totalPages' by setting count = totalPages and pageSize = 1
  const service = useMachine(pagination.machine, {
    id: useId(),
    page: currentPage,
    count: totalPages,
    pageSize: 1,
    siblingCount: 1,
    onPageChange: (details) => onPageChange(details.page),
  });

  const api = pagination.connect(service, normalizeProps);

  if (api.totalPages <= 1) return null;

  return (
    <div {...api.getRootProps()} className="join p-2 justify-center gap-0.5">
      {/* Previous Button */}
      <RippleButton
        {...api.getPrevTriggerProps()}
        className="join-item btn btn-square bg-base-200 rounded-r-sm"
      >
        <MdOutlineKeyboardDoubleArrowLeft className="size-4" />
      </RippleButton>

      {/* Dynamic Page Numbers & Ellipses */}
      {api.pages.map((page, index) => {
        if (page.type === "page") {
          return (
            <RippleButton
              key={page.value}
              {...api.getItemProps({ type: "page", value: page.value })}
              className={cn(
                "join-item btn rounded-sm",
                api.page === page.value &&
                  "btn-active btn-primary pointer-events-none",
              )}
            >
              {page.value}
            </RippleButton>
          );
        }

        if (page.type === "ellipsis") {
          return (
            <RippleButton
              key={`ellipsis[${index}]`}
              {...api.getEllipsisProps({ index })}
              className="join-item btn btn-disabled bg-base-200 pointer-events-none rounded-sm"
            >
              ...
            </RippleButton>
          );
        }

        return null;
      })}

      {/* Next Button */}
      <RippleButton
        {...api.getNextTriggerProps()}
        className="join-item btn btn-square bg-base-200 rounded-l-sm"
      >
        <MdOutlineKeyboardDoubleArrowRight className="size-4" />
      </RippleButton>
    </div>
  );
};

export default Pagination;
