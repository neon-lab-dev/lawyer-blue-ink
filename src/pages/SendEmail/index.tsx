import { useEffect, useState } from "react";
import SelectTemplate from "./SelectTemplate";
import SelectedTemplate from "./TemplateSelected";
import EnterDetails from "./EnterDetails";
import ExcelSheet from "./ExcelSheet";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ITemplate } from "@/types/template.type";
import { handleGetTemplates } from "@/api/template";
import Loading from "@/components/reusable/Loading";
import { useDispatch } from "react-redux";
import {
  clearAttachedFiles,
  setAvailableTemplates,
} from "@/store/slices/templates";

export type AttachedFiles = {
  templateId: string;
  files: File[];
}[];

const SendEmail = () => {
  const dispatch = useDispatch();
  const { tab } = useParams();
  const { pathname } = useLocation();

  const { data, isLoading, isError } = useQuery<ITemplate[]>({
    queryFn: handleGetTemplates,
    queryKey: ["templates"],
  });

  useEffect(() => {
    if (data) {
      dispatch(setAvailableTemplates(data));
    }
  }, [data]);

  useEffect(() => {
    if (pathname.split("/").length !== 3) {
      dispatch(clearAttachedFiles());
    }
  }, [pathname]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching templates</div>;

  if (!tab) {
    return <SelectTemplate templates={data!} />;
  }

  if (tab === "template-selected") {
    return <SelectedTemplate />;
  }
  if (tab === "enter-details") {
    return <EnterDetails />;
  }

  if (tab === "excel-sheet") {
    return <ExcelSheet />;
  }
};
export default SendEmail;
