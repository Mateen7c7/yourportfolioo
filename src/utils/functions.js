import { ip, projectId, storageId } from "@/appwrite";

const generateUrl = (id) => {

  return `${ip}/storage/buckets/${storageId}/files/${id}/view?project=${projectId}`;
};
export { generateUrl };
