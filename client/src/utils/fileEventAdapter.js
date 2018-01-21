const adaptFileEventToValue = delegate => (e) => {
  if (e.target.files[0]) {
    const preview = document.querySelector('.photo-preview');
    const reader = new FileReader();

    reader.onload = () => {
      if (preview) {
        preview.src = reader.result;
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  }
  return delegate(e.target.files[0]);
};

export default adaptFileEventToValue;
