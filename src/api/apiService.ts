const apiServiceDef = () => {
  const fetchRandomImg = async () => {
    const response = await fetch("https://picsum.photos/150");
    const result = response.url;

    console.log(result);

    return result;
  };

  const fetchSpecificImg = async (
    id: string | null,
    selectedStyleType: string,
    blurValue?: number
  ) => {
    const params = new URLSearchParams();

    if (selectedStyleType === "blur" && blurValue) {
      params.set("blur", blurValue.toString());
    } else if (selectedStyleType === "grayscale") {
      params.set("grayscale", "");
    }

    const response = await fetch(
      `https://picsum.photos/id/${id}/150?${params.toString()}`
    );

    const result = response.url;
    return result;
  };

  return { fetchRandomImg, fetchSpecificImg };
};

export const apiService = apiServiceDef();
