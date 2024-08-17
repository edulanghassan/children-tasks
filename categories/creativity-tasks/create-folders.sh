#!/bin/bash

# Path to your JSON file (in external storage)
JSON_FILE="G:\Projects\Programming\Web\children-tasks\categories\creativity-tasks\creativity-and-entertainment-tasks.json"

# Target directory where folders will be created
TARGET_DIR="G:\Projects\Programming\Web\children-tasks\categories\creativity-tasks\images"

# Initialize counter
counter=1

# Extract titles and convert to param-case (kebab-case)
cat "$JSON_FILE" | jq -r '.[] | .["title-en"]' | while IFS= read -r title; do
  # Convert the title to param-case (lowercase, spaces replaced with dashes)
  folder_name=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
  
  # Format the counter with leading zeros and concatenate it with the folder name
  formatted_counter=$(printf "%03d" $counter)
  final_folder_name="${formatted_counter}.${folder_name}"

  # Create the folder in the target directory
  mkdir "$TARGET_DIR/$final_folder_name"
  
  # Increment the counter
  counter=$((counter + 1))
done

$SHELL