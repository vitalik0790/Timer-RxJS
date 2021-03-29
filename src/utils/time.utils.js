export const formatTime = (seconds) => {
  const displayedSeconds = seconds % 60;
  const minutes = Math.floor((seconds / 60) % 60);
  const hours = Math.floor(seconds / 3600);

  return [hours, minutes, displayedSeconds].map((value) => (value > 9 ? value : `0${value}`)).join(' : ');
};
