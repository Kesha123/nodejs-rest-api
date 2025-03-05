#!/bin/bash
api_image='{"api":"api_image_name"}'
migrations_image='{"migrations":"migrations_image_name"}'

# Merge the JSON outputs using jq
merged_images=$(jq -n --argjson api "$api_image" --argjson migrations "$migrations_image" '{api: $api.api, migrations: $migrations.migrations}')

# Print the merged JSON
echo "Merged JSON: $merged_images"

# Set the merged JSON as an environment variable (simulating GitHub Actions set-output)
export GITHUB_ENV=$(mktemp)
echo "merged_images=$merged_images" >> $GITHUB_ENV
echo "::set-output name=merged_images::$merged_images"

# Print the environment variable to verify
echo "GITHUB_ENV content:"
cat $GITHUB_ENV
