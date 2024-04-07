import useColumnCount from '@/lib/hooks/useColumnCount';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useColumnCount', () => {
  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 3000;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(6);
  });
  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 2000;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(6);
  });
  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 1299;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(5);
  });
  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 1000;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(4);
  });
  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 800;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(3);
  });
  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 576;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(2);
  });

  it('should update column count based on window width', () => {
    const { result } = renderHook(() => useColumnCount());

    act(() => {
      // Simulate window resize
      global.innerWidth = 10;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(1);
  });
});
