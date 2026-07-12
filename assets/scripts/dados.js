export async function getVagas() {
  try {
    const response = await fetch("../../assets/dados/vagas.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch operations failed:", error);
    return [];
  }
}
