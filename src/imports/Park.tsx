import imgPark from "figma:asset/5f90a2e28663986e3cb18ac9a95c3ad254db50d0.png";

export default function Park() {
  return (
    <div className="relative size-full" data-name="Park">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPark} />
    </div>
  );
}