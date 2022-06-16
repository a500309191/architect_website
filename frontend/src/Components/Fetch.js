import React from "react";
import useFetch from "../hooks/useFetch";
import { Loading } from "./Loading";

export function Fetch({
	uri,
	renderSuccess,
	loadingFallback = <Loading />,
	renderError = error => <pre>{JSON.stringify(error, null, 2)}</pre>
  }) {
	const { loading, data, error } = useFetch(uri);
	if (loading) return loadingFallback;
	if (error) return renderError(error);
	if (data) return renderSuccess({ data });
}

