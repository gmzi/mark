export function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      setLoading(false)
      return true;
    }
    return;
  }
