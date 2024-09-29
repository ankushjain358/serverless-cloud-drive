export default function About() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full p-10">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">About </h3>
        <p className="text-sm text-muted-foreground">About Cloud Drive</p></div><div className="p-6 pt-0">
        <p className="mb-5">
          The Cloud Drive is a web application designed to provide users with a convenient and efficient way to store and manage their files.
        </p>
        <p className="mb-5">
          With a user-friendly interface and powerful features, the Cloud Drive aims to simplify the process of file management and enhance the overall user experience.
        </p>
      </div>
    </div>
  );
}
