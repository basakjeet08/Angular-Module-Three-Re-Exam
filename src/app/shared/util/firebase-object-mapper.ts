// This function returns the firebase list objects to JSON Objects
export function mapFirebaseListObject<T>(
  response: { [key: string]: T } | undefined
): T[] {
  if (!response) return [];

  return Object.keys(response).map((key) => {
    return { ...response[key], id: key };
  });
}

// This function returns the firebase normal objects to Json Model Objects
export function mapFirebaseObject<T>(response: T | null, id: string): T | null {
  return response ? { ...response, id } : null;
}
