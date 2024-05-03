import Button from "@/components/reusable/Button";
import article from "@/assets/icons/article.svg";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ITemplate } from "@/types/template.type";
import { handleGetTemplates } from "@/api/template";
import Loading from "@/components/reusable/Loading";

const SelectTemplate = ({
  setSelectedPage,
  setSelectedTemplate,
  setSelectedTemplateName,
}: {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTemplateName: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const { data, isLoading, isError } = useQuery<ITemplate[]>({
    queryFn: handleGetTemplates,
    queryKey: ["templates"],
  });

  useEffect(() => {
    if (data) {
      setTemplates(data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching templates</div>;

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
          {templates.map((item, i) => (
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
                    setSelectedTemplate(item.data);
                    setSelectedPage("template-selected");
                    setSelectedTemplateName(item.file_name);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTemplate;
