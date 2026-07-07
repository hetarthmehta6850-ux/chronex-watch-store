import { useEffect } from "react";

export const useSEO = ({ title, description, keywords, ogTitle, ogDescription }) => {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = `${title} | Chronex Luxury Watches`;
    }

    // 2. Update Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute("content", description);
    }

    // 3. Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    if (keywords) {
      metaKeywords.setAttribute("content", keywords);
    }

    // 4. Update Open Graph Title
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitle) {
      metaOgTitle = document.createElement("meta");
      metaOgTitle.setAttribute("property", "og:title");
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.setAttribute("content", ogTitle || title || "");

    // 5. Update Open Graph Description
    let metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (!metaOgDesc) {
      metaOgDesc = document.createElement("meta");
      metaOgDesc.setAttribute("property", "og:description");
      document.head.appendChild(metaOgDesc);
    }
    metaOgDesc.setAttribute("content", ogDescription || description || "");
  }, [title, description, keywords, ogTitle, ogDescription]);
};
