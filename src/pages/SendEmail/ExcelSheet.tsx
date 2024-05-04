import leftArrow from "../../assets/icons/left-arrow.svg";
import ExcelTableRow from "./ExcelTableRow";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import { clearExcelData } from "@/store/slices/templates";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ExcelSheet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { excelData } = useAppSelector((state) => state.templates);

  useEffect(() => {
    if (excelData && excelData.length > 0) {
      localStorage.setItem("excelData", JSON.stringify(excelData));
    }
  }, [excelData]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <button
          onClick={() => {
            navigate("/send-email/template-selected");
            dispatch(clearExcelData());
          }}
        >
          <img className="w-[44px]" src={leftArrow} alt="" />
        </button>
        <h1 className="text-text text-base font-work-sans font-semibold">
          Excel Sheet
        </h1>
        {excelData && excelData.length > 0 ? (
          <div className="overflow-x-auto hide-scrollbar">
            <table className="table-auto border-collapse">
              <thead>
                <tr className="text-text text-[14px] font-work-sans font-medium">
                  {Object.keys(excelData[0]).map((key: string, i: number) => {
                    if (key === "isSent") return null;
                    return (
                      <th
                        key={i}
                        className="border px-3 py-4 min-w-fit truncate"
                      >
                        {key}
                      </th>
                    );
                  })}
                  <th className="border px-3 py-4">Attach Files</th>
                  <th className="border px-3 py-4">Send Email</th>
                </tr>
              </thead>
              <tbody>
                {excelData
                  ?.filter((item) => item)
                  ?.map((item, i: number) => (
                    <ExcelTableRow key={i} item={item} index={i} />
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <span className="text-text text-[20px] font-semibold">
              No data available
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ExcelSheet;
