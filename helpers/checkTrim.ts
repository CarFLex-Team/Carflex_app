export const checkTrim = async (carDetails: any) => {
  try {
    let link;

    const title = carDetails.title.toLowerCase();

    // Define the links with conditions
    const links = {
      ford: "https://webhooks.eliaracarflex.cfd/webhook/6bd64937-b301-49ed-ac12-178fa8bc052a",
      sierra_silverado_ram:
        "https://webhooks.eliaracarflex.cfd/webhook/roboflow",
    };

    if (title.includes("ford")) {
      link = links.ford;
    } else if (
      title.includes("sierra") ||
      title.includes("silverado") ||
      title.includes("ram")
    ) {
      link = links.sierra_silverado_ram;
    }

    // Make the request only if a link was chosen
    if (link) {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carDetails.image_src),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trim data");
      }

      const result = await response.json();
      return result.class ?? "N/A"; // Return the class or "N/A"
    } else {
      return "out"; // Return "out" if no matching link was found
    }
  } catch (error) {
    console.error("Error in trim check:", error);
    throw error; // Re-throw the error to be handled in the component
  }
};
