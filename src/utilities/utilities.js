const utils = {
  getIconType: (gameCategory) => {
    switch (gameCategory) {
      case "card":
        return 'style';
      case "board":
        return 'dashboard';
      case "dice":
        return 'casino';
      case "recreational sports":
        return "golf_course";
      default:
        return "fiber_manual_record";
    }
  },
  scrollTo: (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: document.getElementById(element).offsetTop
    });
  },
  sortGames: (a,b) => {
      // sorts array alphabetically by title
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
  }
};

export default utils;
