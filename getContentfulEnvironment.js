/**
 * Environment resolver for contentful-typescript-codegen.
 * Uses dynamic import to avoid CommonJS `require` while remaining compatible
 * with the codegen's `require()` of this file.
 */
const getContentfulEnvironment = async () => {
  const { default: contentful } = await import("contentful-management")

  const spaceId = process.env.CONTENTFUL_SPACE_ID
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
  const environmentId =
    process.env.CONTENTFUL_ENVIRONMENT_ID || process.env.CONTENTFUL_ENVIRONMENT || "master"

  if (!spaceId || !accessToken) {
    throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN")
  }

  const client = contentful.createClient({ accessToken })
  const space = await client.getSpace(spaceId)
  return space.getEnvironment(environmentId)
}

module.exports = getContentfulEnvironment
