export const getTagsCount = (
  hasBargaining?: boolean,
  hasBuildingDisadvantages?: boolean,
  hasApartDisadvantages?: boolean
) => {
  let counter = 0;
  if (hasBargaining) {
    counter++;
  }
  if (hasBuildingDisadvantages) {
    counter++;
  }
  if (hasApartDisadvantages) {
    counter++;
  }
  return counter;
};
