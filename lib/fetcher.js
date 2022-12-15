const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default fetcher;
