"use client";

import UseOrgin from "@/hooks/use-origin";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import ApiAlert from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityId: string;
}

const ApiList: FC<ApiListProps> = ({ entityName, entityId }) => {
  const params = useParams();
  const router = useRouter();
  const origin = UseOrgin();
  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <div>
      <ApiAlert
        title="GET"
        variant="public"
        discription={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        discription={`${baseUrl}/${entityName}/{${entityId}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        discription={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        discription={`${baseUrl}/${entityName}/{${entityId}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        discription={`${baseUrl}/${entityName}/{${entityId}}`}
      />
    </div>
  );
};

export default ApiList;
