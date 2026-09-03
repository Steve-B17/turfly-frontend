const sportImages = {
  Football:
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=60",
  Cricket:
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=60",
  Basketball:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=60",
  Tennis:
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=60",
  Badminton:
    "https://images.unsplash.com/photo-1613918431703-aa50889ee2a4?auto=format&fit=crop&w=800&q=60",
  Volleyball:
    "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=800&q=60",
};

const defaultImage =
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=60";

export function getTurfImage(sportType) {
  return sportImages[sportType] || defaultImage;
}
