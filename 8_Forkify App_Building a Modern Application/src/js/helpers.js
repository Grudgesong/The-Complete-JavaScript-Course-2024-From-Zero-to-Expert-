import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  // Defining a function that returns a promise, rejecting it after a specified time
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Sending a GET request to the API endpoint
    const data = await res.json(); // Parsing the JSON response

    // Checking if the response is not ok, throwing an error if it is not
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
/*
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // Sending a GET request to the API endpoint
    const data = await res.json(); // Parsing the JSON response

    // Checking if the response is not ok, throwing an error if it is not
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sentJSON = async function (url, uploadData) {
  try {
    //Fetch request
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // Sending a GET request to the API endpoint
    const data = await res.json(); // Parsing the JSON response

    // Checking if the response is not ok, throwing an error if it is not
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
