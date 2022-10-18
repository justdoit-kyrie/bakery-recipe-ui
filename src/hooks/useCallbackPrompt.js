import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useBlocker from './useBlocker';

/**
 * show confirm modal when navigate difference path
 * @param {Boolean} when
 * @returns {Array} [isShow, onConfirm, onCancel]
 */

export default function useCallbackPrompt(when) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const onCancel = useCallback(() => {
    setIsShow(false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      // in if condition we are checking next location and current location are equals or not
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        setIsShow(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation]
  );

  const onConfirm = useCallback(() => {
    setIsShow(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return { isShow, onConfirm, onCancel };
}
