import { FooterProps } from "../types";

export const fetcherFooter = async (
  ...args: Parameters<typeof fetch>
): Promise<FooterProps> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
};
