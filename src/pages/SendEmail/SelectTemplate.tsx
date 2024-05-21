import Button from "@/components/reusable/Button";
import article from "@/assets/icons/article.svg";
import { ITemplate } from "@/types/template.type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setSelectedTemplateId,
  setTemplateSubject,
} from "@/store/slices/templates";

const SelectTemplate = ({
  templates,
}: {
  templates: ITemplate[];
}): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col gap-8">
        <h2 className="text-text text-base font-work-sans font-semibold">
          Choose the template for sending emails
        </h2>
        <h2 className="text-text text-base font-work-sans font-semibold">
          Template List
        </h2>
        {/* table */}
        <div className="flex flex-col gap-0 min-w-[800px] w-full max-w-7xl scrollbar-md">
          {/* table head */}
          <div className="rounded-t-[4px] bg-table-header text-gray grid grid-cols-4 text-[15px] border-t border-x border-gray/10 font-medium p-[20px] pl-[60px]">
            {["Template ID", "Template Name", "Preview", "Action"].map(
              (item, i) => (
                <span key={i} className="">
                  {item}
                </span>
              )
            )}
          </div>
          {templates.length > 0 ? (
            templates.map((item, i) => (
              <div
                key={i}
                className={`rounded-t-[4px] text-gray grid grid-cols-4 border-x text-[14px] border-gray/10 font-medium p-[20px] pl-[60px] ${
                  i === templates.length - 1 ? "border-b" : "border-y"
                }`}
              >
                <span className="my-auto truncate">{item._id}</span>
                <span className="my-auto truncate">{item.file_name}</span>
                <img
                  src={article}
                  alt={item.file_name}
                  className="h-[100px] my-auto w-[100px] aspect-square object-contain object-center"
                />
                <div className="flex items-center my-auto gap-12">
                  <Button
                    variant="supportive"
                    onClick={() => {
                      navigate("/send-email/template-selected");
                      dispatch(setSelectedTemplateId(item._id));
                      dispatch(setTemplateSubject(item.subject));
                    }}
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-text text-[16px] mt-12">
              No templates found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectTemplate;
