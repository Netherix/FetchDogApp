const API_BASE = "https://frontend-take-home-service.fetch.com";

// Fetch all dog breeds
export const fetchBreeds = async () => {
  try {
    const res = await fetch(`${API_BASE}/dogs/breeds`, { credentials: "include" });
    return res.ok ? await res.json() : [];
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return [];
  }
};

// Fetch dogs based on search criteria
export const fetchDogs = async (selectedBreed, page, sortOrder) => {
  try {
    const query = new URLSearchParams({
      size: 10,
      from: page * 10,
      sort: `breed:${sortOrder}`,
    });

    if (selectedBreed) query.append("breeds", selectedBreed);

    const res = await fetch(`${API_BASE}/dogs/search?${query}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch dog IDs");

    const { resultIds } = await res.json();

    return fetchDogDetails(resultIds);
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return [];
  }
};

// Fetch detailed information for specific dogs
export const fetchDogDetails = async (dogIds) => {
  try {
    if (!dogIds.length) return [];

    const res = await fetch(`${API_BASE}/dogs`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogIds),
    });

    return res.ok ? await res.json() : [];
  } catch (error) {
    console.error("Error fetching dog details:", error);
    return [];
  }
};

// Fetch the matched dog based on favorite selections
export const fetchMatchedDog = async (favorites) => {
  try {
    if (!favorites.length) return null;

    const dogIds = favorites.map((dog) => dog.id);

    const matchRes = await fetch(`${API_BASE}/dogs/match`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogIds),
    });

    if (!matchRes.ok) throw new Error("Failed to fetch match");

    const { match: matchedDogId } = await matchRes.json();

    const matchedDogs = await fetchDogDetails([matchedDogId]);
    return matchedDogs.length ? matchedDogs[0] : null;
  } catch (error) {
    console.error("Error fetching match:", error);
    return null;
  }
};

// Logout function
export const logout = async () => {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
