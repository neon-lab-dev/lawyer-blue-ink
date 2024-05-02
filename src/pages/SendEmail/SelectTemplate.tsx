import Button from "@/components/reusable/Button";
import article from "@/assets/icons/article.svg";
import React from "react";

const SelectTemplate = ({
  setSelectedPage,
  setSelectedTemplate,
}: {
  setSelectedPage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const templatesLists = [
    {
      _id: "AWRD456",
      name: "Template 1",
    },
    {
      _id: "AWRD456",
      name: "Template 2",
    },
    {
      _id: "AWRD456",
      name: "Template 3",
    },
    {
      _id: "AWRD456",
      name: "Template 3",
    },
    {
      _id: "AWRD456",
      name: "Template 3",
    },
    {
      _id: "AWRD456",
      name: "Template 3",
    },
    {
      _id: "AWRD456",
      name: "Template 3",
    },
  ];
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
          {templatesLists.map((item, i) => (
            <div
              key={i}
              className={`rounded-t-[4px] text-gray grid grid-cols-4 border-x text-[14px] border-gray/10 font-medium p-[20px] pl-[60px] ${
                i === templatesLists.length - 1 ? "border-b" : "border-y"
              }`}
            >
              <span className="my-auto">{item._id}</span>
              <span className="my-auto">{item.name}</span>
              <img
                src={article}
                alt={item.name}
                className="h-[100px] my-auto w-[100px] aspect-square object-contain object-center"
              />
              <div className="flex items-center my-auto gap-12">
                <Button
                  variant="supportive"
                  onClick={() => {
                    setSelectedTemplate(item._id);
                    setSelectedPage("template-selected");
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
