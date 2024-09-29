export default function Home() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full p-10">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Cloud Drive </h3>
        <p className="text-sm text-muted-foreground">Full Stack application built using AWS Amplify Gen2</p></div><div className="p-6 pt-0">
        <p className="mb-5">
          The Cloud Drive is a web application designed to provide users with a convenient and efficient way to store and manage their files.
        </p>
        <p className="mb-5">This app uses the following technologies:
        </p>
        <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mt-2">
          <li>AWS Amplify Gen2</li>
          <li>AWS AppSync</li>
          <li>Amazon DynamoDB</li>
          <li>AWS Lambda</li>
          <li>AWS Cognito</li>
          <li>AWS S3</li>
          <li>AWS CDK</li>
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>Shadcn UI</li>
        </ul>
      </div>
    </div>

  );
}
