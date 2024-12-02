export default function Register() {
  return (
    <div className="card w-96 shadow-xl rounded-md bg-slate-200">
      <div className="card-body">
        <input
          type="text"
          placeholder="email"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="password2"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full">register me</button>
        </div>
      </div>
    </div>
  );
}
