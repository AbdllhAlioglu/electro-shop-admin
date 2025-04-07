"use client";
import { useState } from "react";
import CategoryTableRow from "./CategoryTableRow";
import CategoryTableHeader from "./CategoryTableHeader";

// Find parent category name helper function
function getParentCategoryName(categories, parentId) {
  if (!parentId) return "-";
  const parent = categories.find((cat) => cat.id === parentId);
  return parent ? parent.name : "-";
}

export default function CategoryTable({ initialCategories }) {
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Clone and sort categories
  const sortedCategories = [...initialCategories].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = (a.name || "").localeCompare(b.name || "");
    } else if (sortBy === "parent_id") {
      const parentA = getParentCategoryName(initialCategories, a.parent_id);
      const parentB = getParentCategoryName(initialCategories, b.parent_id);
      comparison = parentA.localeCompare(parentB);
    } else if (sortBy === "created_at") {
      comparison = new Date(a.created_at) - new Date(b.created_at);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white ">
        <CategoryTableHeader
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
        <tbody className=" divide-gray-200">
          {sortedCategories?.map((category) => (
            <CategoryTableRow
              key={category.id}
              category={category}
              categories={initialCategories}
              parentName={getParentCategoryName(
                initialCategories,
                category.parent_id
              )}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
