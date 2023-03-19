import { put, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setUploadImageProgress } from 'ca-bootstrap/bootstrapAction';

export function setUploader(payload, api) {
  let emit;
  const chan = eventChannel((emitter) => {
    emit = emitter;
    return () => {};
  });
  const setUploadProgress = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };
  const uploadPromise = api(payload, setUploadProgress);
  return { uploadPromise, chan };
}

export function* setProgressWatcher(chan) {
  while (true) {
    const progress = yield take(chan);
    yield put(setUploadImageProgress(progress));
  }
}