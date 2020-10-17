async function waitForModalToBeHidden(duration = 500): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default waitForModalToBeHidden;
