export const safeImage = (src) => {
  if (!src || src === "string")
    return "https://imgs.search.brave.com/fYkD5wfC_-Rme5c7BsUqQrc85GwiSHKVsArtXOFqpBc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzQzLzk3LzA4/LzM2MF9GXzY0Mzk3/MDg2OV9xWVduenp1/em5iTU83VGF5bVFp/cndNblE1ZmlRSFpi/dS5qcGc";
  return src;
};
