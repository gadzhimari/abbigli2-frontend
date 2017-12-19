const PrepareTitle = title => (
  title.replace('&amp;', '&').replace('&#39;', '\'')
);

export default PrepareTitle;
