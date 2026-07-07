import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, input, textarea, [data-hover]');
      els.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovering(true));
        el.addEventListener('mouseleave', () => setHovering(false));
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseout', leave);
    addHoverListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseout', leave);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div
      className={`custom-cursor ${hovering ? 'hover' : ''}`}
      style={{
        left: pos.x - 10,
        top: pos.y - 10,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
